import naturalCompare from "natural-compare";
import { createEslintRule } from "../utils";
import type { TSESTree } from "@typescript-eslint/typescript-estree";
import type { RuleFix } from "@typescript-eslint/utils/ts-eslint";

const isValidOrders = {
  asc(a: string, b: string) {
    return a <= b;
  },
  ascI(a: string, b: string) {
    return a.toLowerCase() <= b.toLowerCase();
  },
  ascN(a: string, b: string) {
    return naturalCompare(a, b) <= 0;
  },
  ascIN(a: string, b: string) {
    return naturalCompare(a.toLowerCase(), b.toLowerCase()) <= 0;
  },
  desc(a: string, b: string) {
    return isValidOrders.asc(b, a);
  },
  descI(a: string, b: string) {
    return isValidOrders.ascI(b, a);
  },
  descN(a: string, b: string) {
    return isValidOrders.ascN(b, a);
  },
  descIN(a: string, b: string) {
    return isValidOrders.ascIN(b, a);
  },
};
export const RULE_NAME = "sort-export-all";
export type MessageIds = "unorderedSortExportAll";

export type Options =
  | ["desc" | "ask", { caseSensitive?: boolean; natural?: boolean }]
  | [];

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  defaultOptions: [],
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "require export * to be sorted",
      url: "https://github.com/nirtamir2/eslint-plugin-sort-export-all",
    },
    messages: {
      unorderedSortExportAll:
        "\"export * from '{{thisName}}'\" should occur before \"export * from '{{prevName}}'\".",
    },
    schema: [
      {
        type: "string",
        enum: ["asc", "desc"],
      },
      {
        type: "object",
        properties: {
          caseSensitive: {
            type: "boolean",
          },
          natural: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    const order = context.options[0] === "desc" ? "desc" : "asc";
    const options = context.options[1] as
      | undefined
      | { caseSensitive?: boolean; natural?: boolean };
    const insensitive = (options && options.caseSensitive) === false;
    const natural = Boolean(options && options.natural);
    const functionName = (order +
      (insensitive ? "I" : "") +
      (natural ? "N" : "")) as keyof typeof isValidOrders;
    const isValidOrder = isValidOrders[functionName];
    if (isValidOrder === null) {
      throw new Error("Invalid options");
    }

    const nodes: Array<TSESTree.ExportAllDeclaration> = [];
    return {
      ExportAllDeclaration: (node) => {
        if (node.type !== "ExportAllDeclaration") {
          return;
        }
        // This ignores cases like `export type *` in TypeScript 5.0
        // It assumes we use @typescript-eslint/parser parser
        if ("exportKind" in node && node.exportKind === "type") {
          return;
        }
        nodes.push(node);
      },
      "Program:exit": () => {
        const sortedNodes = nodes.toSorted((a, b) => {
          return isValidOrder(a.source.value, b.source.value) ? -1 : 1;
        });

        for (const [index, sortedNode] of sortedNodes.entries()) {
          if (nodes[index] === sortedNode) {
            continue;
          }

          const node = nodes[index];
          if (node == null) {
            continue;
          }

          const thisName = sortedNode.source.value;
          const prevName = node.source.value;
          if (isValidOrder(thisName, prevName)) {
            context.report({
              messageId: "unorderedSortExportAll",
              node: sortedNode,
              ...(sortedNode.loc === null ? null : { loc: sortedNode.loc }),
              data: {
                thisName,
                prevName,
              },
              fix(fixer) {
                if (node == null) return null;
                const fixes: Array<RuleFix> = [];
                const { sourceCode } = context;
                const moveExportAllDeclaration = (
                  fromNode: TSESTree.ExportAllDeclaration,
                  toNode: TSESTree.ExportAllDeclaration,
                ) => {
                  const prevText = sourceCode.getText(fromNode);
                  const thisComments = sourceCode.getCommentsBefore(fromNode);
                  for (const thisComment of thisComments) {
                    fixes.push(
                      fixer.insertTextBefore(
                        toNode,
                        `${sourceCode.getText(thisComment)}\n`,
                      ),
                    );
                    fixes.push(fixer.remove(thisComment));
                  }
                  fixes.push(fixer.replaceText(toNode, prevText));
                };
                moveExportAllDeclaration(node, sortedNode);
                moveExportAllDeclaration(sortedNode, node);
                return fixes;
              },
            });
          }
        }
      },
    };
  },
});
