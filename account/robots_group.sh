#!/usr/bin/env bash

set -x
account_id=$(aws sts get-caller-identity --query Account --output text)

aws iam detach-group-policy --group-name Robots --policy-arn "arn:aws:iam::$account_id:policy/robot-policy"
aws iam remove-user-from-group  --group-name Robots --user-name git

aws iam delete-group --group-name Robots
aws iam create-group --group-name Robots

aws iam delete-policy --policy-arn "arn:aws:iam::$account_id:policy/robot-policy"

policy_arn=$(aws iam create-policy --policy-name robot-policy --policy-document file://robot_policy.json  --query Policy.Arn --output text)

aws iam attach-group-policy --group-name Robots --policy-arn $policy_arn

access_key_id=$(cat git.json | jq -r .AccessKey.AccessKeyId)
aws iam delete-access-key --access-key-id $access_key_id --user-name git

aws iam delete-user --user-name git
aws iam create-user --user-name git

aws iam add-user-to-group --user-name git --group-name Robots

aws iam create-access-key --user-name git > git.json
