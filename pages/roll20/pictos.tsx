export interface PictosProps {
  char?: string;
  font?: string;
}

const pictosCharacters: Record<string,string> = {
  'explain': 'w',
  'reload': '0',
  'settings': 'y',
}

export default function Pictos({ char, font }: PictosProps) {
  return (
    <span style={{fontFamily: font || 'Pictos'}}>{pictosCharacters[char] || char}</span>
  )
}