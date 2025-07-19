
    $(document).ready(function() {
        // Header scroll effect
        $(window).scroll(function() {
            if ($(window).scrollTop() > 50) {
                $('#header').addClass('scrolled');
            } else {
                $('#header').removeClass('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });

        // Category selection
        $('.category-icon').on('click', function() {
            $('.category-icon').removeClass('active');
            $(this).addClass('active');
        });



        // Newsletter form submission
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            const email = $('.newsletter-input').val();
            
            if (email) {
                const button = $('.btn-subscribe');
                const originalText = button.html();
                
                button.html('<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...');
                button.prop('disabled', true);
                
                // Simulate API call
                setTimeout(function() {
                    button.html('<i class="fas fa-check me-2"></i>Subscribed!');
                    $('.newsletter-input').val('');
                    
                    setTimeout(function() {
                        button.html(originalText);
                        button.prop('disabled', false);
                    }, 2000);
                }, 1000);
            }
        });

        // Countdown timer
        function updateCountdown() {
            const now = new Date().getTime();
            const targetDate = new Date('2028-12-31 23:59:59').getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                $('#days').text(days.toString().padStart(2, '0'));
                $('#hours').text(hours.toString().padStart(2, '0'));
                $('#minutes').text(minutes.toString().padStart(2, '0'));
                $('#seconds').text(seconds.toString().padStart(2, '0'));
            }
        }

        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        // Testimonial slider initialization
        $('.testimonial-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button class="prev-arrow"><i class="fa-solid fa-arrow-left fa-lg"></i></button>',
            nextArrow: '<button class="next-arrow"><i class="fa-solid fa-arrow-right fa-lg"></i></button>',
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
            ]
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation classes based on element type
                    if (element.classList.contains('category-section')) {
                        $(element).find('.section-title, .section-subtitle').addClass('animate-fade-in-up');
                        $(element).find('.category-icon').each(function(index) {
                            setTimeout(() => {
                                $(this).addClass('animate-bounce-in');
                            }, index * 150);
                        });
                    }
                    
                    if (element.classList.contains('about-section')) {
                        $(element).find('.about-image-wrapper').addClass('animate-slide-in-left');
                        $(element).find('.about-content').addClass('animate-slide-in-right');
                    }
                    
                    if (element.classList.contains('services-section')) {
                        $(element).find('.section-title, .section-subtitle').addClass('animate-fade-in-up');
                        $(element).find('.service-card').each(function(index) {
                            setTimeout(() => {
                                $(this).addClass('animate-fade-in-up');
                            }, index * 150);
                        });
                    }
                    
                    if (element.classList.contains('popular-meals-section')) {
                        $(element).find('.section-title, .section-subtitle').addClass('animate-fade-in-up');
                        $(element).find('.meal-card').each(function(index) {
                            setTimeout(() => {
                                $(this).addClass('animate-fade-in-up');
                            }, index * 100);
                        });
                    }
                    
                    if (element.classList.contains('testimonials-section')) {
                        $(element).find('.section-title, .section-subtitle').addClass('animate-fade-in-up');
                        $(element).find('.testimonial-item').each(function(index) {
                            setTimeout(() => {
                                $(this).addClass('animate-slide-in-left');
                            }, index * 150);
                        });
                    }
                    
                    if (element.classList.contains('contact-section')) {
                        $(element).find('.section-title, .section-subtitle').addClass('animate-fade-in-up');
                        $(element).find('.contact-info-card').each(function(index) {
                            setTimeout(() => {
                                $(this).addClass('animate-slide-in-right');
                            }, index * 150);
                        });
                        $(element).find('.contact-form').addClass('animate-slide-in-left');
                    }
                    
                    if (element.classList.contains('guarantee-section')) {
                        $(element).find('.section-title, .section-subtitle').addClass('animate-fade-in-up');
                        $(element).find('.stat-card').each(function(index) {
                            setTimeout(() => {
                                $(this).addClass('animate-bounce-in');
                            }, index * 150);
                        });
                        $(element).find('.testimonial-card').addClass('animate-slide-in-left');
                    }
                    
                    if (element.classList.contains('newsletter-section')) {
                        $(element).find('.newsletter-title, .newsletter-subtitle, .newsletter-form').addClass('animate-fade-in-up');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe sections for animations
        $('.category-section, .about-section, .services-section, .popular-meals-section, .testimonials-section, .contact-section, .guarantee-section, .newsletter-section').each(function() {
            observer.observe(this);
        });

        // Mobile menu close on link click
        $('.navbar-nav .nav-link').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });

        // Gallery image hover effect
        $('.gallery-image').on('mouseenter', function() {
            $(this).css('transform', 'scale(1.05)');
        }).on('mouseleave', function() {
            $(this).css('transform', 'scale(1)');
        });

        // Parallax effect for hero section
        $(window).scroll(function() {
            const scroll = $(window).scrollTop();
            const rate = scroll * -0.5;
            $('.hero-background').css('transform', 'translate3d(0, ' + rate + 'px, 0)');
        });

        // Floating herbs animation
        $('.herb').each(function(index) {
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 2;
            $(this).css({
                'animation-delay': randomDelay + 's',
                'animation-duration': randomDuration + 's'
            });
        });

        // Service card hover effect
        $('.service-card').on('mouseenter', function() {
            $(this).find('.service-icon').addClass('animate-bounce-in');
        });

        // Meal card image hover effect
        $('.meal-card').on('mouseenter', function() {
            $(this).find('.meal-image').css('transform', 'scale(1.05)');
        }).on('mouseleave', function() {
            $(this).find('.meal-image').css('transform', 'scale(1)');
        });

        // Stats counter animation
        function animateCounter(element, target, duration) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target.toString().includes('+')) {
                    element.text(Math.floor(current) + '+');
                } else if (target.toString().includes('/')) {
                    element.text(target);
                } else {
                    element.text(Math.floor(current));
                }
            }, 16);
        }

        // Trigger counter animation when stats come into view
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const statNumber = $(entry.target).find('.stat-number');
                    const targetText = statNumber.text();
                    
                    if (targetText.includes('+')) {
                        const target = parseInt(targetText.replace('+', ''));
                        animateCounter(statNumber, target, 2000);
                    } else if (targetText === '24/7') {
                        // Keep as is for 24/7
                    } else {
                        const target = parseInt(targetText.replace('+', ''));
                        animateCounter(statNumber, target, 2000);
                    }
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        $('.stat-card').each(function() {
            statsObserver.observe(this);
        });

        // Social links hover effect
        $('.social-link').on('mouseenter', function() {
            $(this).css('transform', 'translateY(-2px)');
        }).on('mouseleave', function() {
            $(this).css('transform', 'translateY(0)');
        });

        // Initialize tooltips if needed
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        // Loading animation for images
        $('img').on('load', function() {
            $(this).addClass('loaded');
        });

        // Add loaded class for images that are already cached
        $('img').each(function() {
            if (this.complete) {
                $(this).addClass('loaded');
            }
        });
    });


         // Shopping Cart Functionality - NEW
        let cart = [];
        
        // Open cart sidebar
        $('#cartBtn').click(function() {
            $('#cartSidebar').addClass('open');
            $('#cartOverlay').addClass('active');
        });
        
        // Close cart sidebar
        $('#closeCart, #cartOverlay').click(function() {
            $('#cartSidebar').removeClass('open');
            $('#cartOverlay').removeClass('active');
        });
        
        // Add to cart functionality
        $('.add-to-cart').click(function() {
            const id = $(this).data('id');
            const name = $(this).data('name');
            const price = parseFloat($(this).data('price'));
            const img = $(this).data('img');
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    img,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Animate cart badge
            $('#cartBadge').addClass('bounce');
            setTimeout(() => {
                $('#cartBadge').removeClass('bounce');
            }, 500);
            
            // Show success message
            const toast = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-success text-white">
                        <strong class="me-auto">Added to cart</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${name} has been added to your cart
                    </div>
                </div>
            </div>`;
            
            $('body').append(toast);
            setTimeout(() => {
                $('.toast').remove();
            }, 3000);
        });
        
        // Update cart display
        function updateCart() {
            // Update cart badge
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            $('#cartBadge').text(totalItems);
            
            // Update cart items list
            const $cartItems = $('#cartItems');
            
            if (cart.length === 0) {
                $cartItems.html(`
                    <div class="text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <p class="text-muted">Your cart is empty</p>
                    </div>
                `);
                $('#checkoutBtn').prop('disabled', true);
            } else {
                $cartItems.empty();
                
                cart.forEach(item => {
                    $cartItems.append(`
                        <div class="cart-item mb-3 p-3 border rounded" data-id="${item.id}">
                            <div class="d-flex">
                                <img src="${item.img}" class="cart-item-img me-3" alt="${item.name}">
                                <div class="flex-grow-1">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-1">${item.name}</h6>
                                        <span class="remove-item"><i class="fas fa-trash"></i></span>
                                    </div>
                                    <p class="mb-2">$${item.price.toFixed(2)}</p>
                                    <div class="d-flex align-items-center">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="text" class="quantity-input mx-2" value="${item.quantity}" readonly>
                                        <button class="quantity-btn plus">+</button>
                                        <span class="ms-auto fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                });
                
                $('#checkoutBtn').prop('disabled', false);
            }
            
            // Calculate totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.10; // 10% tax
            const total = subtotal + tax;
            
            $('#cartSubtotal').text('$' + subtotal.toFixed(2));
            $('#cartTax').text('$' + tax.toFixed(2));
            $('#cartTotal').text('$' + total.toFixed(2));
        }
        
        // Handle quantity changes and item removal
        $('#cartItems').on('click', '.minus', function() {
            const $input = $(this).siblings('.quantity-input');
            let quantity = parseInt($input.val());
            
            if (quantity > 1) {
                quantity -= 1;
                $input.val(quantity);
                
                const itemId = $(this).closest('.cart-item').data('id');
                const item = cart.find(item => item.id === itemId);
                item.quantity = quantity;
                
                updateCart();
            }
        });
        
        $('#cartItems').on('click', '.plus', function() {
            const $input = $(this).siblings('.quantity-input');
            let quantity = parseInt($input.val());
            
            quantity += 1;
            $input.val(quantity);
            
            const itemId = $(this).closest('.cart-item').data('id');
            const item = cart.find(item => item.id === itemId);
            item.quantity = quantity;
            
            updateCart();
        });
        
        $('#cartItems').on('click', '.remove-item', function() {
            const itemId = $(this).closest('.cart-item').data('id');
            cart = cart.filter(item => item.id !== itemId);
            
            updateCart();
        });
        
        // Checkout button
        $('#checkoutBtn').click(function() {
            alert('Checkout functionality would go here! Total: $' + $('#cartTotal').text());
        });

        // Smooth scrolling for navigation links
        $('a[href^="#"]').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - 80
            }, 800);
        });

        // Hero button animation
        $('.btn-hero').on('mouseenter', function() {
            $(this).css('transform', 'translateY(-3px)');
        }).on('mouseleave', function() {
            $(this).css('transform', 'translateY(0)');
        });

  //daily menu 



$(document).ready(function() {
  // Filter functionality
  $('.filter').click(function() {
    let category = $(this).data('category');
    $('.filter').removeClass('active');
    $(this).addClass('active');

    if (category === 'all') {
      $('.menu-card').show();
    } else {
      $('.menu-card').hide();
      $('.' + category).show();
    }
  });

  // Quantity controls
  $('.plus').click(function(e) {
    e.stopPropagation();
    let quantityElement = $(this).siblings('.quantity');
    let current = parseInt(quantityElement.text());
    quantityElement.text(current + 1);
    updateCartButton($(this).closest('.menu-card'));
  });

  $('.minus').click(function(e) {
    e.stopPropagation();
    let quantityElement = $(this).siblings('.quantity');
    let current = parseInt(quantityElement.text());
    if (current > 1) {
      quantityElement.text(current - 1);
      updateCartButton($(this).closest('.menu-card'));
    }
  });

  // Cart functionality
  let cart = [];
  
  function updateCartButton(card) {
    let quantity = parseInt(card.find('.quantity').text());
    let btn = card.find('.cart-btn');
    
    if (quantity > 1) {
      btn.html(`<i class="fas fa-shopping-cart"></i> Add ${quantity}`);
    } else {
      btn.html(`<i class="fas fa-shopping-cart"></i> Add`);
    }
  }

  $('.cart-btn').click(function() {
    let card = $(this).closest('.menu-card');
    let itemId = card.find('h3').text();
    let price = parseFloat(card.find('.price').text());
    let quantity = parseInt(card.find('.quantity').text());
    
    // Check if item already in cart
    let existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: itemId,
        price: price,
        quantity: quantity
      });
    }
    
    // Update UI

  });
});








$(document).ready(function(){
  $('.cardslider').slick({
      slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  prevArrow: '<button class="prev-arrow"><i class="fa-solid fa-arrow-left fa-lg"></i></button>',
  nextArrow: '<button class="next-arrow"><i class="fa-solid fa-arrow-right fa-lg"></i></button>',
  autoplaySpeed: 2000,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]

  });
});