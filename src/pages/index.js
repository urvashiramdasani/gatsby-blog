import * as React from "react"
import { graphql } from "gatsby"

// Components
import Layout from "components/Layout"
import Seo from "components/SEO"
import HomeBanner from "components/HomeBanner"
import BlogPostCard from "components/BlogPostCard"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Seo title="Home" />
      <HomeBanner />
      <main>
        {posts.map(({node}, i) => {
          const title = node.frontmatter.title

          return <BlogPostCard key={i} slug="/" title={title} date={node.frontmatter.date} excerpt={node.excerpt} 
          readingTime={node.fields.readingTime.text} image={node.frontmatter.image.childImageSharp.fluid} />
        })}
      </main>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query blogListQuery {
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            date
            title
            image {
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
