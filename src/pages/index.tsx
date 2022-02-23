import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  return (
    <MainLayout
      title={t('nav:main.dashboard')}
      breadCrumbs={[
        { name: t('nav:main.name'), link: '' },
        { name: t('nav:main.dashboard'), link: '/' },
      ]}
    ></MainLayout>
  )
}

type props = {
  data?: any
}

export const getServerSideProps: GetServerSideProps<props> = async () => {
  return {
    props: {},
  }
}
