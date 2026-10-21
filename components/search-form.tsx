import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localePath } from "@/i18n/config";
import { getT } from "@/i18n/server";

// Plain GET form to /browse: works without JS and keeps the query in the URL.
export async function SearchForm({ defaultValue = "", category }: { defaultValue?: string; category?: string }) {
  const t = await getT();
  return (
    <form action={localePath("/browse", t.locale)} method="get" role="search" className="flex w-full max-w-xl gap-2">
      <label htmlFor="q" className="sr-only">{t("Search gear")}</label>
      <Input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={t("Search tents, cameras, games…")}
        className="min-h-12 flex-1 border-2 border-border bg-background text-base shadow-xs"
      />
      {category && <input type="hidden" name="category" value={category} />}
      <Button type="submit" size="lg" aria-label={t("Search")}>
        <Search aria-hidden /> <span className="hidden sm:inline">{t("Search")}</span>
      </Button>
    </form>
  );
}
