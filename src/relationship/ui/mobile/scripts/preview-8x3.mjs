import { hierarchyPreviewRelation } from '../mocks/hierarchyPreviewMock.ts';
import { buildMuCategories } from '../components/mutualUnderstanding/buildMuCategories.ts';

const categories = buildMuCategories(hierarchyPreviewRelation);

console.log('相互理解（8 × 3）\n');

for (const category of categories) {
  console.log(`## ${category.label}`);
  for (const item of category.items) {
    console.log(`\n### ${item.label}`);
    item.bodies.forEach((body, i) => {
      const prefix = item.bodies.length > 1 ? `${i + 1}. ` : '';
      console.log(`${prefix}${body}`);
    });
  }
  console.log('');
}
