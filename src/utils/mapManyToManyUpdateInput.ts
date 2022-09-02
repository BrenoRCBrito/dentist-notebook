type ManyToManyRelationsSimpleObject = {
  groups?: number[];
  clients?: number[];
};

export default function mapManyToManyUpdateInput(
  updateInputObject: ManyToManyRelationsSimpleObject,
) {
  return Object.entries(updateInputObject).reduce((acc, cur) => {
    if (cur[0] === 'groups' || cur[0] === 'clients') {
      acc[cur[0]] = {
        connect: cur[1].map((relationId) => {
          return { id: relationId };
        }),
      };
      return acc;
    } else {
      acc[cur[0]] = cur[1];
      return acc;
    }
  }, {});
}
