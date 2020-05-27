# 업무현황 구글시트
https://docs.google.com/spreadsheets/d/1VH7XSbkStFspFQS7fBrJ24ZVemHsGmEX0Ey1w1HETuM/edit?usp=sharing
구글시트에 안내된 파일명 및 디렉토리 구조 활용하여 작업 필수

### 진행상태
- 미진행 : 작업 착수 전
- 진행중(localhost) : 로컬에서 작업 진행중인 항목 (업무 착수시에는 '진행중' 체크해 주세요)
- 수정중(localhost) : 완료된 항목인데 추가 수정사항이 나와 재수정 진행중인 항목
- 검토요청(develop) : 작업 1차 완료 후 디자인 또는 기획팀에 검토(QA) 요청할 항목 
- 완료(master) : 검토 완료되어 개발 가능한 항목 (반드시 git master로 merge에 상태 변경 해주세요)
- 비대상 : 단순 Link이거나 중복되어 작업 불필요한 항목
- 대기 : 바로 작업을 진행해야하지만, 선행작업 또는 의사결정이 필요해 잠시 대기중인 항목
- 보류 : 일정상 후순위로 작업하기로  약속된 항목

### 미리보기 URL 루트
진행상태 변경시 디렉토리구조와 파일명 입력값에 따라 URL이 자동 적용되므로
구글시트 현황 상태 변경하기 전에 Git branch 병합(merge) 작업이 선행되어야 합니다.
- 로컬 개발 : http://localhost:2020/
- 작업 검토용(develop) : http://pms.inseq.co.kr:9000/abworks/yuhs/develop/
- 완료 후 개발팀 전달(master) : http://pms.inseq.co.kr:9000/abworks/yuhs/master/

# 퍼블리싱 업무절차
1. [PMS > 이슈](http://pms.inseq.co.kr:9000/abworks/yuhs/issues) 메뉴에서 에서 본인에게 할당된 업무를 확인합니다.
1건의 업무당 1개의 이슈를 생성함을 원칙으로 하며, 구두상으로 새 업무를 할당받은 경우 새 이슈를 직접 생성합니다.

2. [업무현황표 구글시트](https://docs.google.com/spreadsheets/d/1VH7XSbkStFspFQS7fBrJ24ZVemHsGmEX0Ey1w1HETuM/edit?usp=sharing)에 진행상태를 `진행중`으로 변경합니다.
![700-20205-11-150-21.png](/files/5699)

3. 소스트리에서 Git 브랜치를 세팅합니다.
    1. develop 브랜치를 체크아웃한 상태에서 > Git Flow 버튼 클릭 > '새 기능 시작' 버튼을 클릭합니다.
![73-20205-11-158-39.png](/files/5703) > ![793-20205-11-155-37.png](/files/5700)
    2. 기능명에 PMS의 이슈번호를 기록합니다. 해당 브랜치는 작업 완료 후 제거되므로 다른 명칭을 적절하게 넣어도 됩니다.
![145-20205-11-156-59.png](/files/5702) 
    3. 소스트리 왼쪽에 해당 브랜치로 체크아웃 되었다면 브랜치 준비 완료되었습니다.
이제 해당 브랜치에서 퍼블리싱 업무를 진행하면 됩니다.
![815-20205-11-1514-23.png](/files/5705) 

4. [_template.html](http://pms.inseq.co.kr:9000/abworks/yuhs/files/develop/severance/sev/html/_guide/_template.html) 파일을 다른이름으로 저장합니다.
이때 구글시트에 표기된 디렉토리 경로 및 파일명을 반드시 맞춰주세요. 
구글시트에서 미리보기 링크 클릭시 화면이 뜨면 제대로 연동된 것입니다. (로컬확인시 VSCode live 서버 기동 필수)

5. 아래 가이드에 맞춰 퍼블리싱 작업을 진행 합니다.
    - 퍼블리싱 컴포넌트 가이드 : http://pms.inseq.co.kr:9000/abworks/yuhs/files/develop/severance/sev/html/_guide/_guide.html
    - 퍼블리싱 템플릿(이 파일을 다른이름으로 저장하여 사용) : http://pms.inseq.co.kr:9000/abworks/yuhs/files/develop/severance/sev/html/_guide/_template.html

6. 완료 후 아래 사항을 검증합니다.
    1. ie10~11, 엣지, 크롬 크로스브라우징 상태 점검
    2. W3C 마크업 오류 점검 : VSCode 부가 기능 활용
    3. OpenWax 스코어 100점 점검
    4. scss 컴파일 오류 여부 점검
    5. 1~4번까지의 항목에 이상이 없다면, 체크아웃해 두었던 feature 브랜치에 커밋합니다. 커밋 메시지는 할당받은 이슈 넘버와 업무 내용을 기입해 주세요.
예) #11 공통 게시판 스킨 추가
    6. 원격저장소에 PUSH 한 뒤 미리보기 링크를 통해 최종적으로 모바일에서도 이상이 없는지 검토합니다.
개인별로 생성한 브랜치는 아래 URL에서 `브랜치경로부분`을 수정해서 확인할 수 있습니다.
예) http://pms.inseq.co.kr:9000/abworks/yuhs/브랜치경로부분/severance/sev/doctor/doctor.html

7. 전체 검토가 마무리 되었다면 Git flow 버튼을 눌러 develop 브랜치에 해당 작업을 병합합니다.
![846-20205-11-1534-25.png](/files/5706) > ![544-20205-11-1536-56.png](/files/5708) 

8. [업무현황표 구글시트](https://docs.google.com/spreadsheets/d/1VH7XSbkStFspFQS7fBrJ24ZVemHsGmEX0Ey1w1HETuM/edit?usp=sharing)에 진행상태를 `검토요청`으로 변경합니다.
변경 후 URL을 클릭하여 잘 뜨는지 확인이 되면 정상적으로 병합되었음을 확인할 수 있습니다.

9. 이후 기획/디자인 팀의 검토의견에 따라 이상이 없으면 `완료`로 상태 변경되고 해당 업무가 종료됩니다.

10. 이상이 있다면 PMS 또는 직접 커뮤니케이션을 통해 관련 사항을 전달받고,
구글시트의 상태를 `수정중`으로 변경한 뒤 위와 동일한 방법으로 업무를 진행합니다.

### 참고자료
- 이전 퍼블리싱 산출물 (참고용) : http://yuhs.inseq.co.kr:7777
- Git flow 참고자료 1 : https://jeong-pro.tistory.com/196
- Git flow 참고자료 2 : https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html
