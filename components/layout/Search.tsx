'use client';

import { SearchIcon } from "lucide-react";
import {
  InputGroup, InputGroupAddon, InputGroupInput
} from "@/components/ui/input-group";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { redirect } from "next/navigation";


export default function SearchProducts() {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState("");

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);

      const search_path = `/search?${params.toString()}`;
      redirect(search_path)
    }
    else {
      params.delete('query');
      redirect('/')
    }
  }

  return (
    <InputGroup className="rounded-lg">
      <InputGroupInput
        placeholder="Search..."
        onChange={(e) => setTerm(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch(term)
        }}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="p-1.5">
        <Button
          className="rounded-none rounded-r-lg"
          onClick={() => handleSearch(term)}
        >
          <SearchIcon />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}