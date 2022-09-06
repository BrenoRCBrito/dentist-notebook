type ManyToManyRelationSimpleObject = {
  groups?: number[];
  clients?: number[];
};

export default function mapManyToManyUpdateInput(
  updateInputObject: ManyToManyRelationSimpleObject,
) {
  return Object.entries(updateInputObject).reduce((accumulator, current) => {
    if (current[0] === 'groups' || current[0] === 'clients') {
      accumulator[current[0]] = {
        connect: current[1].map((relationId) => {
          return { id: relationId };
        }),
      };
      return accumulator;
    } else {
      accumulator[current[0]] = current[1];
      return accumulator;
    }
  }, {});
}
