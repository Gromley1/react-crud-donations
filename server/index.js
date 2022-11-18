const fastify = require('fastify')({ logger: true })

.register(require('./routes/donations'), { prefix: '/api/donations' })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()