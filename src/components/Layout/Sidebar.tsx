import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FaLayerGroup,
  FaLightbulb,
  FaCamera,
  FaMountain,
  FaPlus
} from 'react-icons/fa'

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  onClick
}) => {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="w-full justify-start gap-2"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  )
}

interface ModalProps {
  onClose: () => void;
}

const AssetsModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Sheet>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Assets Library</SheetTitle>
          <SheetDescription>
            Browse and manage your project assets
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="grid grid-cols-2 gap-4 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Asset {i + 1}</CardTitle>
                </CardHeader>
                <CardContent className="aspect-square bg-muted"></CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const [showAssets, setShowAssets] = React.useState(false)

  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col gap-4 p-4">
        <Button
          variant="default"
          className="w-full gap-2"
          onClick={() => setShowAssets(true)}
        >
          <FaPlus className="h-4 w-4" />
          Add Asset
        </Button>

        <nav className="flex flex-col gap-2">
          <SidebarItem
            icon={FaLayerGroup}
            label="Assets"
            active={activeItem === 'Assets'}
            onClick={() => setActiveItem('Assets')}
          />
          <SidebarItem
            icon={FaLightbulb}
            label="Lighting"
            active={activeItem === 'Lighting'}
            onClick={() => setActiveItem('Lighting')}
          />
          <SidebarItem
            icon={FaCamera}
            label="Cameras"
            active={activeItem === 'Cameras'}
            onClick={() => setActiveItem('Cameras')}
          />
          <SidebarItem
            icon={FaMountain}
            label="Environment"
            active={activeItem === 'Environment'}
            onClick={() => setActiveItem('Environment')}
          />
        </nav>

        {showAssets && <AssetsModal onClose={() => setShowAssets(false)} />}
      </div>
    </div>
  )
}

export default Sidebar