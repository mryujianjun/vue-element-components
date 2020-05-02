import { createTest, destroyVM } from '../util';
import IMenu from 'src/components/IMenu';

describe('IMenu', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(IMenu, true);
    expect(vm.$el).to.exist;
  });
});

