import mongoose from 'mongoose'

export default async () => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.mongoUrl)
    // eslint-disable-next-line no-console
    console.log('Starting mongoose...')
  }
  catch (err) {
    console.error('DB connection failed.', err)
  }
}
