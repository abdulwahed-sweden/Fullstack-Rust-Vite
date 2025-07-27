import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, XCircle, Loader2 } from "lucide-react"

export function AgeChecker() {
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{
    message: string
    type: "success" | "warning" | "error"
  } | null>(null)

  const handleSubmit = async () => {
    if (!age) return
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch("http://localhost:8080/api/check-age", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age: Number(age) }),
      })

      const data = await res.json()
      setResponse(data)
    } catch {
      setResponse({
        message: "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setAge("")
    setResponse(null)
  }

  const getResponseStyle = (type: string) => {
    const styles = {
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    }
    return `${styles[type]} p-4 rounded-lg flex items-center gap-3 mb-4`
  }

  const getResponseIcon = (type: string) => {
    const icons = {
      success: <CheckCircle2 className="text-green-500 h-5 w-5" />,
      warning: <AlertTriangle className="text-yellow-500 h-5 w-5" />,
      error: <XCircle className="text-red-500 h-5 w-5" />
    }
    return icons[type]
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-center">Age Verification</CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mb-4"
            min={1}
            max={120}
            disabled={loading}
          />

          {response && (
            <div className={getResponseStyle(response.type)}>
              {getResponseIcon(response.type)}
              <span>{response.message}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={loading || !age}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check Age"
            )}
          </Button>
          
          {response && (
            <Button
              variant="outline"
              onClick={reset}
              className="flex-1"
            >
              Reset
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}