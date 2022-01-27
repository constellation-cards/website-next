interface RepeatingAttributeProps {
  children: JSX.Element;
  name: string;
}

export default function RepeatingAttribute(props: RepeatingAttributeProps) {
  return (
    <fieldset className={`repeating_${props.name}`}>{props.children}</fieldset>
  );
}
