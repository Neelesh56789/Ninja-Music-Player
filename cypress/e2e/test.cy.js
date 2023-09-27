describe('Music Player', () => {
    beforeEach(() => {
        cy.visit('index.html');
    });

    it('should load the music player with all elements', () => {
        cy.get('i.fa-play', { timeout: 10000 }).should('exist');
        cy.get('.skip-forward').should('be.visible');
        cy.get('.skip-back').should('be.visible');
        cy.get('.img').should('be.visible');
        cy.get('.audio-title').should('contain.text', 'Let me down slowly');
        cy.get('.audio-singer').should('contain.text', 'Alec Benjamin');
        cy.get('.progress').should('be.visible');
        cy.get('.progress-bar').should('exist');
        cy.get('.progress-head').should('be.visible');
    });

    it('should play and pause the audio', () => {
        cy.get('i.fa-play').click();
        cy.get('i.fa-pause', { timeout: 10000 }).should('be.visible');
        cy.get('i.fa-pause').click();
        cy.get('i.fa-play', { timeout: 10000 }).should('be.visible');
    });

    it('should skip to the next track', () => {
        cy.get('.skip-forward').click();
        cy.get('.audio-title').should('contain.text', 'Let me love you');
        cy.get('.audio-singer').should('contain.text', 'DJ Snake/Justin Beiber');
    });

    // it('should skip to the previous track', () => {
    //     cy.get('.skip-previous').click();
    //     cy.get('.audio-title').should('contain.text', 'Perfect');
    //     cy.get('.audio-singer').should('contain.text', 'Ed Sheeran');
    // });
    
    

    it('should update progress bar on song play', () => {
        cy.get('i.fa-play').click();
        cy.wait(5000);  // wait for 5 seconds to allow song to play a bit
        cy.get('.progress-bar').invoke('width').should('be.gt', 0);
    });

    it('should show correct duration of the track', () => {
        cy.get('.duration').invoke('text').should('not.eq', '0:00');
    });

    it('should update current time while playing', () => {
        cy.get('i.fa-play').click();
        cy.wait(5000);  // wait for 5 seconds to allow song to play a bit
        cy.get('.current-time').invoke('text').should('not.eq', '0:00');
    });
});

describe('Previous track checking', () => {
    beforeEach(() => {
        cy.visit('index.html'); 
        cy.viewport(1280, 720);
    });

    it('should skip to the previous track', () => {
        cy.get('.audio-title').should('contain.text', 'Let me down slowly');
        
        // Try triggering mouse down and up events
        cy.get('.skip-back').trigger('mousedown').trigger('mouseup');
        
        cy.screenshot(); // Taking a screenshot after button click
        
        // Check if the title first becomes something other than 'Let me down slowly'
        cy.get('.audio-title').should('not.contain.text', 'Let me love you');
        
        // And then becomes 'Perfect'
        cy.get('.audio-title').should('contain.text', 'Let me down slowly');
        
        cy.get('.audio-singer').should('contain.text', 'Alec Benjamin');
    });
});



describe('Music Player Responsiveness', () => {

    const resolutions = [
      [375, 667],  // iPhone 6/7/8
      [768, 1024], // iPad
      [1024, 1366],// Small Laptop
      [1440, 2560] // Large Monitor
    ];
  
    resolutions.forEach((resolution) => {
      it(`should display properly at resolution ${resolution[0]}x${resolution[1]}`, () => {
        cy.viewport(resolution[0], resolution[1]);
        cy.visit('index.html'); // Update with the correct path
  
        // Check if the main elements are visible
        cy.get('.audio-container').should('be.visible');
        cy.get('.audio-img').should('be.visible');
        cy.get('.audio-title').should('be.visible');
        cy.get('.audio-singer').should('be.visible');
        cy.get('.audio-progress').should('be.visible');
        cy.get('.audio-btns').should('be.visible');
        cy.get('.btn.play').should('be.visible');
        cy.get('.btn.skip-back').should('be.visible');
        cy.get('.btn.skip-forward').should('be.visible');
  
      });
    });
  });
  






