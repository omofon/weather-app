export default function HourData({ img, hour, temp }) {
  return (
    <div className="w-full h-15 flex justify-between items-center bg-paper border-border-dim text-font-main rounded-md">
      <div className="flex">
        <img src={img} alt={`$i{img} logo - ${hour}`} className="w-6 h-6" />
        <span>{hour}</span>
      </div>
      <span>{temp}</span>
    </div>
  );
}
