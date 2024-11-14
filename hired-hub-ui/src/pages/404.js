const PageNotFound = () => {

    return (
        <div class="content-wrapper pt-5">
            <section class="content">
                <div class="error-page">
                    <h2 class="headline text-warning">404</h2>
                    <div class="error-content">
                        <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! Trang không tìm thấy.</h3>
                        <p>
                            Chúng tôi không thể tìm được trang mà bạn đang tìm.
                            Trong khi đó, bạn nên <a href="/">trở về trang chủ</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PageNotFound;