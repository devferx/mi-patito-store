import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const DuckForm = () => {
  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Agregar nuevo patito</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="color">Color</Label>
              <Select>
                <SelectTrigger id="color" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Red">Rojo</SelectItem>
                  <SelectItem value="Green">Verde</SelectItem>
                  <SelectItem value="Yellow">Amarillo</SelectItem>
                  <SelectItem value="Black">Negro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="size">Tamaño</Label>
              <Select>
                <SelectTrigger id="size" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="XLarge">XLarge</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="XSmall">XSmall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Precio (USD)</Label>
              <Input id="price" placeholder="21.25" type="number" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Cantidad</Label>
              <Input id="price" placeholder="15" type="number" />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button>Agregar</Button>
      </CardFooter>
    </Card>
  )
}
