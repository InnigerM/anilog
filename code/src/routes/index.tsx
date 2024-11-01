import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>COOOUUUUNT</Button>
    </div>
  );
}
