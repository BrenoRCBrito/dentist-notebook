type ManyToManyRelationSimpleObject = {
  groups?: number[];
  clients?: number[];
  doctors?: number[];
};

export default function mapManyToManyUpdateInput(
  updateInputObject: ManyToManyRelationSimpleObject | unknown,
) {
  return Object.entries(updateInputObject).reduce((accumulator, current) => {
    if (
      current[0] === 'groups' ||
      current[0] === 'clients' ||
      current[0] === 'doctors'
    ) {
      accumulator[current[0]] = {
        connect: current[1].map((relationId) => {
          if (relationId !== 0) {
            return { id: relationId };
          }
        }),
      };
      return accumulator;
    } else {
      accumulator[current[0]] = current[1];
      return accumulator;
    }
  }, {});
}
