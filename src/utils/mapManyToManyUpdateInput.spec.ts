import mapManyToManyUpdateInput from './mapManyToManyUpdateInput';

describe('mapManyToManyUpdateInput', () => {
  it('Should map group connection array correctly', () => {
    expect(mapManyToManyUpdateInput({ id: 1, groups: [1, 2] })).toStrictEqual({
      id: 1,
      groups: { connect: [{ id: 1 }, { id: 2 }] },
    });
  });
});
