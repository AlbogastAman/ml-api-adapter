/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 --------------
 ******/

'use strict'

const Config = require('../../lib/config')
const AccountService = require('../../domain/account')
const Logger = require('@mojaloop/central-services-shared').Logger

const validate = (request, name, password, cb) => {
  if (!password) {
    return cb(null, false)
  }
  if (Config.ADMIN_KEY && Config.ADMIN_SECRET && name === Config.ADMIN_KEY && password === Config.ADMIN_SECRET) {
    return cb(null, true, { name: Config.ADMIN_KEY, is_admin: true })
  }
  return AccountService.verify(name, password)
    .then(account => cb(null, true, account))
    .catch(e => {
      Logger.error(e)
      return cb(null, false)
    })
}

module.exports = {
  name: 'account',
  scheme: 'basic',
  validate
}
