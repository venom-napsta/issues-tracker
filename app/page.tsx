import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div className="mt-30">
      <Pagination currentPage={3} itemCount={25} pageSize={10} />
    </div>
  );
}
