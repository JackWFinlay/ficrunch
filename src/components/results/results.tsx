import Graph from "./graph/graph"
import { CalculationContext } from "@/models/calculationContext"
import { useContext } from "react"
import ResultsTable from "./table/table"
import { createTableData } from "@/lib/utils"
import Details from "./details/details"

export default function Results() {
  const { calculationInput } = useContext(CalculationContext)

  const { tableData, chartData } = createTableData(calculationInput)

  return (
    <div className="w-78 lg:w-120 xl:w-180">
      <div className="flex flex-col gap-2.5">
        <Graph chartData={chartData} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5032004213694675"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5032004213694675"
          data-ad-slot="1250480448"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <Details chartData={chartData} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5032004213694675"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5032004213694675"
          data-ad-slot="1250480448"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <ResultsTable tableData={tableData} />
      </div>
    </div>
  )
}
