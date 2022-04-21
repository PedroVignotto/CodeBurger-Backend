import './config/module-alias'
import { app } from '@/main/config/app'

import 'reflect-metadata'

app.listen(3333, () => console.log('Server is running at http://localhost:3333'))
