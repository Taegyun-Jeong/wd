;(function($, window, document, a){

    class Wedding {
        init(){
            this.header(); 
            this.section1(); 
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();
            this.section10();
            this.section11();
            this.footer();
            this.modal();
        }        // 밑에 있는 모든 메서드를 실행시켜주는것
        header(){

        }
        section1(){
            // 메인슬라이드 페이드인아웃 효과
            let cnt = -1;
            let id = 0;
            // 1. 메인슬라이드함수
                function mainSlide(){

                    $('.slide').css({zIndex:1, opacity:1});   // 모든 슬라이드 초기화
                    $('.slide').eq(cnt+1).css({zIndex:2});
                    $('.slide').eq(cnt).css({zIndex:3}).animate({opacity:0},1000);  // eq : 슬라이드번호. ( 0번부터 시작)

                }
            // 2. 다음카운트함수
                function nextCount(){
                    cnt++;  // 0 1 2  
                    if(cnt>1){  // 2 정지
                         clearInterval(id); // 타이머정지
                    }    
                    else{   // 0 1 
                        mainSlide();
                    }
                    
                }
            // 3. 실행구현
            
                id = setInterval(nextCount, 3000);
                
                
        }
        section2(){}
        section3(){}
        section4(){}
        section5(){}
        section6(){
            // form 전송하기
            //$.ajax({});
            // form 전송 버튼을 클릭하면 전송된다.
            $('.submit-btn').on({
                click(e){
                    e.preventDefault;
                    $.ajax({
                        url: './form_mail.php',
                        type:'POST',
                        dataType: 'JSON',
                        data: {
                            "이름": $('#name').val(), 
                            "이메일": $('#email').val(), 
                            "게스트인원수": $('#guests').val(), 
                            "이벤트": $('#event').val() 
                        },
                        success(reslut){
                            console.log( "ajax 성공" );
                            console.log( result );
                        },
                        error(error){
                            console.log( "ajax 실패" );
                            console.log( error );
                        }
                    });
                }
            });
        }
        section7(){}
        section8(){
            // 3초 후에 우측에서 좌측으로 -25% 부드럽게 이동하는 애니메이션
            const slideContainer = $('.slide-container');
            const slideWrap = $('.slide-wrap');
            // setTimeout(function(){
            //     slideWrap.animate({left: `${-25 * cnt }%`},600);
            // },3000);

            // 메인슬라이드 함수
            function mainSlide(){
                slideWrap.animate({left: `${-25 * cnt }%`},600,'easeInOutExpo');
            }

            // 다음 슬라이드
            function  nextSlide(){
                cnt++;
                mainSlide();
            }
            // 이전 슬라이드
            function  prevSlide(){
                cnt--;
                mainSlide();
            }
            // 터치 스와이프
            let touchStart = null;  // 터치 시작
            let touchEnd = null;    // 터치 끝
            let cnt = 0;

            //드래그
            let mouseDown = false;      // 마우스 다운이되면 드래그 시작임을 신호
            let dragStart = null;
            let dragEnd = null;


            slideContainer.on({
                mousedown(event){
                    mouseDown = true;
                    touchStart = event.clientX;
                    //console.log("touchStart 시작", event.clientX );       // 터치 시작
                    dragStart = event.clientX - slideWrap.offset().left;
                },
                mouseup(event){
                    touchEnd = event.clientX;
                    //console.log("touchEnd 끝", event.clientX );       // 터치 끝  

                    console.log(touchStart - touchEnd);
                    if(touchStart - touchEnd >= 0){
                        console.log('다음슬라이드');
                        nextSlide();
                    }
                    
                    if(touchStart - touchEnd < 0){
                        console.log('이전슬라이드');
                        prevSlide();                        
                    }
                    mouseDown=false;

                },
                mousemove(e){
                    if(mouseDown !== true) return;      // 다운이 되야만 드래그한다.
                    console.log(e.clientX);

                    dragEnd = e.clientX;
                    // 마우스로 드래그 시작 ~ 끝 간격만 이동
                    slideWrap.css({ left: e.clientX - dragStart});
                }
            });

        }
        section9(){}
        section10(){}
        section11(){}
        footer(){}
        modal(){

            let num = null; 

            // 모달창 닫기
            $('.modal-close-btn').on({
                click(e){
                    e.preventDefault ();                // 기본기능 차단. a 태그는 기본적으로 새로고침이 내포되어있다.
                    $('.modal').stop().fadeOut(600);
                }
            });

            // 갤러리 이미지 클릭
            // 모달창 열기 => 스크롤바를 숨김
            $('.img-btn').on({
                click(e){
                    e.preventDefault ();
                    
                    // let img = $(this).attr('src');
                    // $('.modal img').prop('src', img); 
                    $('html').addClass('on');
                    num = $(this).data('idx');
                    $('.modal img').fadeOut().attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300); // 현재 클릭한 이미지 src 이미지를 넣어라
                    $('.modal').fadeIn();
                }
            });

            // 흰색창 클릭 > 창닫기
            $('.modal .container').on({
                click(){
                    $('html').removeClass('on');
                    $('.modal').stop().fadeOut(600);
                }
            });

            // 모달창 이미지 클릭 이벤트
            // 부모박스까지의 클릭 이벤트 전파 차단하기
            $('.modal img').on({
                click(e){
                    e.stopPropagation();        // 부모까지의 이벤트 차단하기
                    num++;
                    if(num>15){num=8};       //마지막 이미지는 처음으로 세팅
                    $('.modal img').attr('src', `./img/wedding-img${num}.jpg`);
                }
            });

            // 다음 화살버튼
            $('.modal-next-btn').on({
                click(e){
                    e.stopPropagation();
                    num++;
                    if(num>15){num=8};
                    $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300);

                }
            })
            // 이전 화살버튼
            $('.modal-prev-btn').on({
                click(e){
                    e.stopPropagation();
                    num--;;
                    if(num<8){num=15};
                    $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300);
                    
                }
            })
        }
    }
     const newWedding = new Wedding();
     newWedding.init();
})(jQuery, window, document);