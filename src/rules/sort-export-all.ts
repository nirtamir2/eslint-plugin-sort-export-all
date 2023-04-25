import { Rule } from "eslint";
import ESTree from "estree";
import naturalCompare from "natural-compare";

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

export const sortExportAll: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "require export * to be sorted",
      category: "Stylistic Issues",
      recommended: false,
      url: "https://github.com/nirtamir2/eslint-plugin-sort-export-all",
    },
    schema: [
      {
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

    let prevNode: ESTree.ExportAllDeclaration | null = null;
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
        if (
          prevNode != null &&
          typeof node.source.value === "string" &&
          typeof prevNode.source.value === "string"
        ) {
          const thisName = node.source.value;
          const prevName = prevNode.source.value;

          if (isValidOrder(thisName, prevName)) {
            context.report({
              message:
                "\"export * from '{{thisName}}'\" should occur before \"export * from '{{prevName}}'\".",
              node,
              ...(node.loc === null ? null : { loc: node.loc }),
              data: {
                thisName,
                prevName,
              },
              fix(fixer) {
                if (prevNode == null) return null;
                const fixes: Rule.Fix[] = [];
                const sourceCode = context.getSourceCode();
                const moveExportAllDeclaration = (
                  fromNode: ESTree.ExportAllDeclaration,
                  toNode: ESTree.ExportAllDeclaration
                ) => {
                  const prevText = sourceCode.getText(fromNode);
                  const thisComments = sourceCode.getCommentsBefore(fromNode);
                  for (const thisComment of thisComments) {
                    fixes.push(
                      fixer.insertTextBefore(
                        toNode,
                        // @ts-ignore
                        `${sourceCode.getText(thisComment)}\n`
                      )
                    );
                    // @ts-ignore
                    fixes.push(fixer.remove(thisComment));
                  }
                  fixes.push(fixer.replaceText(toNode, prevText));
                };
                moveExportAllDeclaration(node, prevNode);
                moveExportAllDeclaration(prevNode, node);
                return fixes;
              },
            });
          }
        }
        prevNode = node;
      },
    };
  },
};
