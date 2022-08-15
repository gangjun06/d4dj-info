import MainLayout from 'layouts/main'

export default function NotFound() {
  return (
    <MainLayout
      breadCrumbs={[
        { name: 'Main', link: '/' },
        { name: 'Page Not Found', link: '' },
      ]}
      title="Page Not Found"
    >
      <></>
    </MainLayout>
  )
}
