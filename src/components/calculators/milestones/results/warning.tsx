import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Warning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">❗️ Warning</CardTitle>
        <CardDescription className="text-destructive">
          You will not reach your <strong>Target</strong> before your specified{" "}
          <strong>Retirement Age</strong>. Adjust either{" "}
          <strong>Starting Amount</strong>, <strong>Contributions</strong>,{" "}
          <strong>Rate</strong>, or <strong>Retirement Age</strong>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
