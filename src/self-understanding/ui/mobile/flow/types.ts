export type SelfUnderstandingStackParamList = {
  ResultCards: undefined;
  CategoryItems: { categoryId: string };
  AskSieTemplates: { categoryId: string; itemId: string };
  DeepDiveCards: { topicId?: string } | undefined;
  Chat: { templateText?: string } | undefined;
  AbstractWordExample: { userQuestion?: string } | undefined;
};
