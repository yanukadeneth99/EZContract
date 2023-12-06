import { Button, Link } from "@nextui-org/react";

export default function BackButton() {
  return (
    <Link href="/user/deploy" className="pl-12">
      <Button color="primary">BACK</Button>
    </Link>
  );
}
