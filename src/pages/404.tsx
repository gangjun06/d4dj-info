import MainLayout from 'layouts/main'

export default function NotFound() {
  return (
    <MainLayout
      breadThumbs={[
        { name: 'Main', link: '/' },
        { name: 'Page Not Found', link: '' },
      ]}
      title="Page Not Found"
    >
      <></>
    </MainLayout>
  )
}
