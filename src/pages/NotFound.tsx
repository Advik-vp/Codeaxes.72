import { Compass } from 'lucide-react'
import { Button } from '../components/common/Button.tsx'
import { EmptyState } from '../components/common/EmptyState.tsx'
import { PageContainer } from '../components/layout/PageContainer.tsx'

export default function NotFound() {
  return (
    <main id="main-content">
      <PageContainer className="py-20">
        <EmptyState
          icon={<Compass className="size-10" />}
          title="This page is off the map"
          description="Codeaxes could not find that route or project. Check the URL, or return to the catalog to keep exploring."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/">Back home</Button>
              <Button to="/projects" variant="secondary">
                Browse projects
              </Button>
            </div>
          }
        />
      </PageContainer>
    </main>
  )
}
