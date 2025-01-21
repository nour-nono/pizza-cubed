import * as mongoose from 'mongoose';
import { User } from '@/models/User';
import { getServerSession } from 'next-auth';
import { UserInfo } from '@/models/UserInfo';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

export async function getUserEmail() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  return userEmail;
}

export async function getUsers(matcher?: Record<string, any>) {
  if (matcher?._id) {
    return User.findById(matcher._id);
  }
  const options: mongoose.PipelineStage[] = [
    {
      $lookup: {
        from: 'userinfos',
        localField: 'email',
        foreignField: 'email',
        as: 'userInfos',
      },
    },
    {
      $unwind: { path: '$userInfos', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        password: 0,
        'userInfos.email': 0,
      },
    },
  ];

  if (matcher) {
    options.push({
      $match: matcher,
    });
  }
  return User.aggregate(options);
}
