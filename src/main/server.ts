import './config/module-alias'
import { app, env } from '@/main/config'

import 'reflect-metadata'

app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
