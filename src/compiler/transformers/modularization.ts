import {
    //__String,
    //AccessorDeclaration,
    //addRange,
    //addSyntheticLeadingComment,
    //AllAccessorDeclarations,
    //append,
    //arrayIsEqualTo,
    //ArrayLiteralExpression,
    //ArrowFunction,
    //BinaryExpression,
    //BindingElement,
    //BindingPattern,
    //Block,
    //BreakOrContinueStatement,
    Bundle,
    //CallExpression,
    //CaseBlock,
    //CaseClause,
    //cast,
    //CatchClause,
    chainBundle,
    //ClassDeclaration,
    //ClassElement,
    //ClassExpression,
    //ClassLikeDeclaration,
    //CommaListExpression,
    //ComputedPropertyName,
    //concatenate,
    //ConstructorDeclaration,
    //createExpressionForPropertyName,
    //createMemberAccessForPropertyName,
    //createRange,
    //createTokenRange,
    //Debug,
    //Declaration,
    //DoStatement,
    //elementAt,
    //EmitFlags,
    //EmitHint,
    //emptyArray,
    //Expression,
    //ExpressionStatement,
    //ExpressionWithTypeArguments,
    //filter,
    //first,
    //firstOrUndefined,
    //flatten,
    //flattenDestructuringAssignment,
    //flattenDestructuringBinding,
    //FlattenLevel,
    //ForInStatement,
    //ForOfStatement,
    //ForStatement,
    //FunctionBody,
    //FunctionDeclaration,
    //FunctionExpression,
    //FunctionLikeDeclaration,
    //GeneratedIdentifierFlags,
    //getAllAccessorDeclarations,
    //getClassExtendsHeritageElement,
    //getCombinedNodeFlags,
    //getCommentRange,
    //getEmitFlags,
    //getEnclosingBlockScopeContainer,
    //getFirstConstructorWithBody,
    //getInternalEmitFlags,
    //getNameOfDeclaration,
    //getOriginalNode,
    getParseTreeNode,
    getSourceFileOfNode,
    //getSourceMapRange,
    //getSuperCallFromStatement,
    //getUseDefineForClassFields,
    //hasStaticModifier,
    //hasSyntacticModifier,
    //Identifier,
    //idText,
    //IfStatement,
    //insertStatementAfterCustomPrologue,
    //insertStatementsAfterCustomPrologue,
    //insertStatementsAfterStandardPrologue,
    //InternalEmitFlags,
    //isArrayLiteralExpression,
    //isArrowFunction,
    //isAssignmentExpression,
    //isBinaryExpression,
    //isBindingPattern,
    //isBlock,
    //isCallExpression,
    //isCallToHelper,
    //isCaseBlock,
    //isCaseClause,
    //isCatchClause,
    //isClassElement,
    //isClassLike,
    //isComputedPropertyName,
    //isDefaultClause,
    //isDestructuringAssignment,
    //isExpression,
    //isExpressionStatement,
    //isForInitializer,
    //isForStatement,
    //isFunctionExpression,
    //isFunctionLike,
    //isHoistedFunction,
    //isHoistedVariableStatement,
    //isIdentifier,
    //isIdentifierANonContextualKeyword,
    //isIfStatement,
    //isInternalName,
    //isIterationStatement,
    //isLabeledStatement,
    //isModifier,
    //isObjectLiteralElementLike,
    //isOmittedExpression,
    //isPackedArrayLiteral,
    //isPrivateIdentifier,
    //isPrologueDirective,
    //isPropertyDeclaration,
    //isPropertyName,
    //isReturnStatement,
    //isSpreadElement,
    isStatement,
    //isStatic,
    //isSuperProperty,
    //isSwitchStatement,
    //isTryStatement,
    //isVariableDeclaration,
    //isVariableDeclarationList,
    //isVariableStatement,
    //isWithStatement,
    //IterationStatement,
    //LabeledStatement,
    //last,
    //lastOrUndefined,
    //LeftHandSideExpression,
    //LiteralExpression,
    //map,
    //MetaProperty,
    //MethodDeclaration,
    //ModifierFlags,
    //moveRangeEnd,
    //moveRangePos,
    //moveSyntheticComments,
    //NamedDeclaration,
    //NewExpression,
    Node,
    //NodeArray,
    //NodeCheckFlags,
    //NodeFlags,
    //nodeIsSynthesized,
    //NumericLiteral,
    //ObjectLiteralElementLike,
    //ObjectLiteralExpression,
    //ParameterDeclaration,
    //ParenthesizedExpression,
    //PrimaryExpression,
    //ProcessLevel,
    //processTaggedTemplateExpression,
    //PropertyAssignment,
    //rangeEndIsOnSameLineAsRangeStart,
    //ReturnStatement,
    //SemicolonClassElement,
    //setCommentRange,
    //setEmitFlags,
    //setOriginalNode,
    //setParent,
    //setSourceMapRange,
    //setTextRange,
    //setTextRangeEnd,
    //setTextRangePos,
    //setTokenSourceMapRange,
    //ShorthandPropertyAssignment,
    //singleOrMany,
    //singleOrUndefined,
    //skipOuterExpressions,
    //skipTrivia,
    //some,
    SourceFile,
    //spanMap,
    //SpreadElement,
    //startOnNewLine,
    //Statement,
    //StringLiteral,
    //SwitchStatement,
    SyntaxKind,
    //TaggedTemplateExpression,
    //takeWhile,
    //TemplateExpression,
    //TextRange,
    //TokenFlags,
    TransformationContext,
    //TransformFlags,
    //tryCast,
    //unescapeLeadingUnderscores,
    //unwrapInnermostStatementOfLabel,
    //VariableDeclaration,
    //VariableDeclarationList,
    //VariableStatement,
    visitEachChild,
    //visitNode,
    visitNodes,
    //visitParameterList,
    VisitResult,
    //VoidExpression,
    //WhileStatement,
    //YieldExpression,
} from "../_namespaces/ts";

/** @internal */
export function transformModularization(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }
        const visited = visitSourceFile(node);
        return visited;
    }

    function shouldVisitNode(node: Node): boolean {
        return node != null;
    }

    function visitor(node: Node): VisitResult<Node | undefined> {
        return shouldVisitNode(node) ? visitorWorker(node) : node;
    }

    function logVerbose(node: any): void {
        const ptn = getParseTreeNode(node);
        if (ptn) {
            const { id, fileName }  = getSourceFileOfNode(ptn);
            console.log("\n",
                "\nkind --> ", ptn.__debugKind,
                "\ntext --> ", ptn.__debugGetText(false),
                "\nemit --> ", ptn.__debugEmitFlags,
                "\ntfrm --> ", ptn.__debugTransformFlags,
                "\nnode --> ", ptn.__debugNodeFlags,
                "\nsrcf --> ", id, fileName,
                "\n");
        }
    }

    function visitorWorker(node: Node): VisitResult<Node | undefined> {
        switch (node.kind) {
            case SyntaxKind.PropertyAccessExpression:
                return visitPropertyAccessExpression(node);
            default:
                return visitEachChild(node, visitor, context);
        }
    }

    function visitPropertyAccessExpression(node: Node): ReturnType<typeof visitorWorker> {
        logVerbose(node);
        return node;
    }

    function visitSourceFile(node: SourceFile): SourceFile {
        visitNodes(node.statements, visitor, isStatement, 0);
        return node;
        /*
        return factory.updateSourceFile(
            node,
            setTextRange(factory.createNodeArray(concatenate(prologue, statements)), node.statements)
        );
        */
    }
}
