import React from 'react'

const ContentContent = () => {
    return (
        <div className="content-container">
          <h2>Content</h2>
          {/* Add content section */}
          <label className="label-left" htmlFor="">Story<span className="required">*</span></label>
          <p className="para-left">Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
          <ReactQuill
            theme="snow"
            value={this.state.storyContent}
            onChange={this.handleStoryChange}
            placeholder="Write something amazing..."
            className="story-input"
          />
        </div>
      );
}

export default ContentContent