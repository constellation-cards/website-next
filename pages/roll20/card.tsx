export default function Card() {
  return (
    <div className={"card"}>
      <input className={'input-header'} type={'text'} name={'attr_front_name'} placeholder={'Card Name (Front)'} />
      <textarea className={'input-description'} name="attr_front_desc" />
    </div>
  );
}