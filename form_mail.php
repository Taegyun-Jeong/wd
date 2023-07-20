<?
//홈페이지
// taegyun0731.dothome.co.kr/Wedding/form_mail.php



// wedding_table
// 이름            : 문자열 가변형
// 이메일          : 문자열 가변형
// 게스트인원수     : 문자열 가변형
// 이벤트          : 문자열 가변형   

//데이터베이스 접근 권한설정
// 1. 데이터베이스 서버이름     >       localhost
// 2. 사용자이름         >  가입시 아이디사용
// 3. 사용자 비밀번호
// 4. 데이터베이스 이름  >  가입시 아이디사용

$db_server      = 'localhost';
$db_user_name   = 'taegyun0731';
$db_user_pw     = 'wjdxorbs1!';
$db_name        = 'taegyun0731';
$conn = mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
mysqli_set_charset($conn, "utf8");

// 받아서
$name = $_POST['name'];             // ['html파일의 input안에 있는 name따라 간다.']
$email = $_POST['email'];
$guests = $_POST['guests'];
$event = $_POST['event'];

// 출력하기
// echo '이름'. $name;
// echo '이메일'. $email;
// echo '게스트인원'. $guests;
// echo '이벤트'. $event;

// 데이터베이스 테이블에 저장하기(insert into)
// 1. 입력 테스트 SQL
// INSERT INTO 테이블이름( 필드1, 필드2, ... ) VALUES ('데이터1','데이터1',... );
$sql = "INSERT INTO WD_table ('name', 'email', 'guest', 'event') VALUES ('이순신', 'LEESOONSHIN@naver.com', 1 , 'Cocktail Party', )";
mysqli_query($conn, $sql);      // 저장 실행 

?>