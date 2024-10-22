import { PipelineStage } from 'mongoose';
import { User } from '@/models/User';

export async function getUsers(matcher?: Record<string, any>) {
  const options: PipelineStage[] = [
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
