
# 야구볼램 

## 개요

야구 볼램은 야구 직관 및 경험 관련 커뮤니케이션 웹 서비스입니다.
야구 팬으로서 직관 경험을 효과적으로 기록하고 공유할 수 있는 플랫폼이 있으면 좋겠다는 의견에서 시작되었습니다. 경기장에서의 특별한 순간들을 기록하고 다른 팬들과 소통할 수 있는 기능이 부족하다고 느꼈기 때문입니다. 이를 통해 팬들 간의 유대감을 강화하고 커뮤니티를 활성화 할 수 있는 플랫폼을 만들고자 했습니다. 개인적인 경험을 일기 형식으로 기록하고 이를 다른 팬들과 공유하며 소통하는 기능을 핵심으로 설정하여 개발 하였습니다.


## 진행 일정

2024.7 - 2024.8 1개월

<img width="548" alt="Schedule" src="https://github.com/user-attachments/assets/55132f8d-7afb-40ec-b1ff-a0fd31a19158" />

## 팀 구성 및 역할

Front

<img width="395" alt="TeamFront" src="https://github.com/user-attachments/assets/fca23480-a2ed-40e7-81f6-3bd6c2771cd1" />

Back

<img width="385" alt="TeamBack" src="https://github.com/user-attachments/assets/fef15041-7d35-4a1e-b162-e8b164236cc4" />

## 기술 및 스택

프레임 워크 
- Typescript, React, Vite
- Firebase, axios
- Node.js, Express, PostgreSQL
- Puppteer, dbdiagram.io

배포
- Vercel
- AWS EC2
- AWS RDS, AWS S3
- AWS Lambda

## 아키텍처

<img width="392" alt="architecture" src="https://github.com/user-attachments/assets/2328a2c3-d4c6-4916-90a2-13cd6d873bb4" />

## ERD 

<img width="263" alt="ERD" src="https://github.com/user-attachments/assets/0e2fee12-5cbd-48b8-84bb-f01333229010" />

## 화면 및 기능

구현한 화면과 해당 화면 내 기능을 설명하겠습니다.

### 로그인 화면

- 사이트에 접근하면 로그인 화면이 뜹니다.
- 기존 회원의 경우 로그인을 할 수 있습니다.
- 회원이 아닌 경우 회원가입 페이지로 넘어갈 수 있습니다.
- 회원가입 시 Firebase에 정보가 저장되고 추가 정보는 PostgreSQL 테이블에 저장되어 관리됩니다.

<img width="948" alt="BaseballArchiveLogin" src="https://github.com/user-attachments/assets/04252fa4-0343-4094-b984-a021d624e862" />

### 일기와 커뮤니티 글 
- 로그인 하고 기록하기를 누르면 일기 또는 커뮤니티 글을 작성할 수 있습니다.
- 적고 싶은 내용을 담고 기록하기를 누르면 글이 게시됩니다.
- 공개로 게시하면 서비스 사용자 모두가 볼 수 있으며 비공개로 올릴 수 있습니다.

<img width="236" alt="BaseballArchiveWriting" src="https://github.com/user-attachments/assets/1e1554ee-dab4-44e8-81c6-43dbf48c66be" />
<img width="251" alt="BaseballArchiveDiary" src="https://github.com/user-attachments/assets/3d659116-60e6-44c1-ae89-9b1f3265b976" />
<img width="268" alt="BaseballArchiveCommunity" src="https://github.com/user-attachments/assets/f5adb137-0acb-46ab-9b2e-68e66163f819" />

### 경기 일정 확인 및 팀 순위 확인 화면
<img width="487" alt="BaseballArchiveSchedule" src="https://github.com/user-attachments/assets/c2310c31-8e87-49b6-b110-2cad8f505386" />
<img width="489" alt="BaseballArchiveRanking" src="https://github.com/user-attachments/assets/cbcb98e8-6da1-4195-b9c9-a07a48e329cb" />

