import Graph from "../graph/graph"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function Results() {
  return (
    <Card className="w-230">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Graph selectedIndex={0} />
      </CardContent>
    </Card>
  )
}
