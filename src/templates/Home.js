import * as React from "react"
import { graphql } from "gatsby"

// Components
import Layout from "components/Layout"
import SEO from "components/SEO"
import HomeBanner from "components/HomeBanner"
import BlogPostCard from "components/BlogPostCard"
import PageNavigation from "components/PageNavigation"

const IndexPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      <HomeBanner />
      <main>
        <PageNavigation currentPage={pageContext.currentPage} numPages={pageContext.numPages} />
        {posts.map(({node}, i) => {
          const title = node.frontmatter.title || node.fields.slug

          return <BlogPostCard key={node.fields.slug} slug={node.fields.slug} title={title} date={node.frontmatter.date} excerpt={node.excerpt} 
          readingTime={node.fields.readingTime.text} image={node.frontmatter.image.childImageSharp.fluid} />
        })}
      </main>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
        limit: $limit
        skip: $skip
      filter: {frontmatter: {type: {eq: "post"}, published: {eq: true}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          fields {
            slug
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
