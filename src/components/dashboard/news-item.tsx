import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsItemProps {
  news: {
    title: string;
    time: string;
    content: string;
  };
}

export default function NewsItem({ news }: NewsItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{news.title}</CardTitle>
        <CardDescription>{news.time}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{news.content}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Read More</Button>
      </CardFooter>
    </Card>
  );
}