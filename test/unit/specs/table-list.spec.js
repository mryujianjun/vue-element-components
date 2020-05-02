import { createTest, destroyVM } from '../util';
import ITableList from 'src/components/ITableList';

describe('ITableList', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(ITableList, true);
    expect(vm.$el).to.exist;
  });
});

