import { DefinitionWord } from '../../../../../types/VocabWord.types';

export const DefinitionsVocab = ({
  definition,
}: {
  definition: DefinitionWord;
}) => {
  return (
    <ul className="pt-2">
      <li className="text-lg">{definition.posFullName}</li>
      <li className="flex items-center gap-2">
        <div
          style={{
            width: '3px',
            height: '8px',
            borderRadius: '1.5px',
            background: '#787878',
          }}
        ></div>
        {definition.englishDefinition}
      </li>
      <li className="flex items-center gap-2">
        <div
          style={{
            width: '3px',
            height: '8px',
            borderRadius: '1.5px',
            background: '#787878',
          }}
        ></div>
        {definition.vietnameseDefinition}
      </li>
    </ul>
  );
};
