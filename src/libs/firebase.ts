import admin from 'firebase-admin'

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8'),
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const firestore = admin.firestore()

export const bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET)
