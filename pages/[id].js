import { useRouter } from "next/router";

export default function Test() {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.id}</h1>
    </div>
  );
}
