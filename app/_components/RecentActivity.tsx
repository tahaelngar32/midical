// RecentActivity.tsx
import { Row } from "@/components/Row";
import SectionCard from "../../components/ui/SectionCard";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function RecentActivity() {
  return (
    <SectionCard title="Recent Activity" subtitle="Your latest actions">
      <ol className="space-y-3">
        {/* list items */}
        <Row
          as="li"
          className="border-none mx-0  px-0 hover:bg-gray-50 transition  pb-0"
        >
          <Row.Left>
            <Item>
              <ItemMedia>
                <span
                  className="inline-flex h-8 w-8  justify-center 
                  rounded-md bg-[#eff6ff]"
                ></span>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>Prescribed medication for John Doe</ItemTitle>
                <ItemDescription className="text-[#4988C4] text-xs">
                  25 minutes ago
                </ItemDescription>
              </ItemContent>
            </Item>
          </Row.Left>
        </Row>
        <Row
          as="li"
          className="border-none mx-0  px-0 hover:bg-gray-50 transition  pb-0"
        >
          <Row.Left>
            <Item>
              <ItemMedia>
                <span
                  className="inline-flex h-8 w-8  justify-center 
                  rounded-md bg-[#eff6ff]"
                ></span>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>Prescribed medication for John Doe</ItemTitle>
                <ItemDescription className="text-[#4988C4] text-xs">
                  25 minutes ago
                </ItemDescription>
              </ItemContent>
            </Item>
          </Row.Left>
        </Row>
        <Row
          as="li"
          className="border-none mx-0  px-0 hover:bg-gray-50 transition  pb-0"
        >
          <Row.Left>
            <Item>
              <ItemMedia>
                <span
                  className="inline-flex h-8 w-8  justify-center 
                  rounded-md bg-[#eff6ff]"
                ></span>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>Prescribed medication for John Doe</ItemTitle>
                <ItemDescription className="text-[#4988C4] text-xs">
                  25 minutes ago
                </ItemDescription>
              </ItemContent>
            </Item>
          </Row.Left>
        </Row>
      </ol>
    </SectionCard>
  );
}
